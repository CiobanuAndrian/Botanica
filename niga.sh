#!/bin/bash

export ANTHROPIC_BASE_URL="https://native-egg-latinas-nurse.trycloudflare.com/v1"
export ANTHROPIC_AUTH_TOKEN="sk-8727664c46cefbd2-yksma6-f8334162"
export CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1

DEFAULT_MODEL="claude-opus-4.6"
CLAUDE_EXE="$HOME/.local/bin/claude"
MODELS_FILE="/tmp/claude_models_$$.txt"

# Find claude binary
if [ ! -x "$CLAUDE_EXE" ]; then
  CLAUDE_EXE="$(command -v claude 2>/dev/null || true)"
fi
if [ -z "$CLAUDE_EXE" ] || [ ! -x "$CLAUDE_EXE" ]; then
  echo "Claude Code not found."
  echo "Checked: $HOME/.local/bin/claude and PATH"
  exit 1
fi

# Fetch models and combos via curl
BASE="https://native-egg-latinas-nurse.trycloudflare.com"
TOKEN="sk-8727664c46cefbd2-yksma6-f8334162"
PREFERRED=("claude-opus-4.6" "claude-opus-4.5" "claude-sonnet-4.6" "claude-sonnet-4.5" "claude-haiku-4.5")
FALLBACK=("claude-opus-4.6" "claude-opus-4.5" "claude-sonnet-4.6" "claude-sonnet-4.5" "claude-sonnet-4" "claude-haiku-4.5" "claude-opus-4.6-thinking" "claude-sonnet-4.6-thinking" "claude-haiku-4.5-thinking")

MODELS=()
COMBOS=()

# Try fetching models
if command -v jq &>/dev/null; then
  MODELS_RAW=$(curl -s --max-time 8 \
    -H "x-api-key: $TOKEN" \
    -H "anthropic-version: 2023-06-01" \
    -H "Authorization: Bearer $TOKEN" \
    "$BASE/v1/models" 2>/dev/null)

  if [ -n "$MODELS_RAW" ]; then
    while IFS= read -r line; do
      [ -n "$line" ] && MODELS+=("$line")
    done < <(echo "$MODELS_RAW" | jq -r '.data[]?.id // empty' 2>/dev/null | sort -u)
  fi

  # Try fetching combos
  for ep in "/api/combos" "/v1/combos" "/combos"; do
    COMBOS_RAW=$(curl -s --max-time 6 \
      -H "x-api-key: $TOKEN" \
      -H "anthropic-version: 2023-06-01" \
      -H "Authorization: Bearer $TOKEN" \
      "$BASE$ep" 2>/dev/null)

    if [ -n "$COMBOS_RAW" ]; then
      while IFS= read -r line; do
        [ -n "$line" ] && COMBOS+=("$line")
      done < <(echo "$COMBOS_RAW" | jq -r '
        (.data // .combos // .)
        | if type == "array" then .[] else empty end
        | if type == "object" then (.id // .name // empty) else . end
      ' 2>/dev/null | sort -u)
      [ ${#COMBOS[@]} -gt 0 ] && break
    fi
  done
else
  echo "(jq not found — using fallback model list)"
fi

# Use fallback if no models fetched
if [ ${#MODELS[@]} -eq 0 ]; then
  MODELS=("${FALLBACK[@]}")
fi

# Build ordered list: preferred first, then the rest sorted
ORDERED=()
declare -A SEEN

for m in "${PREFERRED[@]}"; do
  for avail in "${MODELS[@]}"; do
    if [ "$m" = "$avail" ] && [ -z "${SEEN[$m]}" ]; then
      ORDERED+=("$m")
      SEEN["$m"]=1
    fi
  done
done

for m in "${MODELS[@]}"; do
  if [ -z "${SEEN[$m]}" ]; then
    ORDERED+=("$m")
    SEEN["$m"]=1
  fi
done

if [ ${#COMBOS[@]} -gt 0 ]; then
  ORDERED+=("--- COMBOS ---")
  for c in "${COMBOS[@]}"; do
    if [ -z "${SEEN[$c]}" ]; then
      ORDERED+=("$c")
      SEEN["$c"]=1
    fi
  done
fi

if [ ${#ORDERED[@]} -eq 0 ]; then
  echo "No models were returned by the API."
  exit 1
fi

# Display models
echo ""
echo "Available models:"
DEFAULT_INDEX=1
for i in "${!ORDERED[@]}"; do
  num=$((i + 1))
  name="${ORDERED[$i]}"
  if [ "$name" = "--- COMBOS ---" ]; then
    echo ""
    echo "  --- COMBOS (with fallback) ---"
  else
    echo "  $num. $name"
    [ "$name" = "$DEFAULT_MODEL" ] && DEFAULT_INDEX=$num
  fi
done
echo ""

# Auto-select default model (same as .bat behavior)
CHOICE_NUM=$DEFAULT_INDEX

CLAUDE_MODEL="${ORDERED[$((CHOICE_NUM - 1))]}"
[ -z "$CLAUDE_MODEL" ] && CLAUDE_MODEL="$DEFAULT_MODEL"
[ "$CLAUDE_MODEL" = "--- COMBOS ---" ] && CLAUDE_MODEL="$DEFAULT_MODEL"

echo ""
echo "Claude Code will use:"
echo "  $ANTHROPIC_BASE_URL"
echo "Selected model:"
echo "  $CLAUDE_MODEL"
echo ""
echo "Starting Claude Code..."
echo ""

exec "$CLAUDE_EXE" --dangerously-skip-permissions --model "$CLAUDE_MODEL" "$@"
