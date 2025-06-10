# Introduction

This is some introductory text.

## My Document Title

``

**❌ Also incorrect:**

```markdown:example.md

# My Document Title
```

**✅ Correct:**

```markdown:example.md
# My Document Title

This is the content of my document.
```

## How to fix

1. Move your H1 heading to the very first line
2. Remove any blank lines or content above the heading
3. Ensure you're using `#` (not `##` or other heading levels)

## If you want to disable this rule

You can disable it in your `.markdownlint.json` config:

```json:.markdownlint.json
{
  "MD041": false
}
```

## Initial Setup

Instructions for setup.

## Advanced Setup

More setup instructions - this duplicates the heading above!

**How to fix:**

- Make headings unique by adding descriptive context
- Use more specific heading names

```markdown:example-fixed.md
# Introduction

Some content here.

## Initial Setup

Instructions for setup.

## Advanced Setup

More setup instructions with a unique heading.
```

## MD025/single-title/single-h1: Multiple top-level headings in the same document

This error occurs when you have more than one H1 heading (`#`) in a single Markdown document.

**Example that triggers the error:**

```markdown:example.md
# First Title

Some content.

# Second Title

This second H1 heading violates the rule!
```

**How to fix:**

- Use only one H1 heading per document (typically the main title)
- Convert additional H1 headings to H2 (`##`) or lower levels

```markdown:example-fixed.md
# Main Document Title

Some content.

## Second Section


Content for the second section using H2 instead
