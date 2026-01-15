# Document Preview Implementation Plan

The goal is to allow users to preview document content by hovering over document cards in the grid view. This helps users find documents quickly without opening them.

## User Review Required

None. This is a frontend-only enhancement using existing API endpoints.

## Proposed Changes

### Frontend

#### [NEW] [DocumentPreviewTooltip.tsx](file:///d:/DuAnRieng/MemMart/client/components/documents/DocumentPreviewTooltip.tsx)

- Create a new component that wraps its children with a `Tooltip`.
- **Logic**:
  - Accepts `docId` and `initialContent` (optional) as props.
  - Manages local state: `content` (string), `loading` (boolean), `isOpen` (boolean).
  - Uses `onOpenChange` to trigger content fetching via `docService.getDocument(docId)` if content is missing.
  - Updates local `content` state with fetched data.
- **UI**:
  - Uses shadcn/ui `Tooltip` components.
  - `TooltipContent` will be styled to be larger (e.g., `w-80 h-64` or `max-w-md`), scrollable, and render markdown content using `react-markdown`.
  - Shows a loading spinner while fetching.
  - Shows "No content" if empty.

#### [MODIFY] [DocumentCard.tsx](file:///d:/DuAnRieng/MemMart/client/components/documents/DocumentCard.tsx)

- Wrap the main card content (the `Link` or `GlassCard`) with `DocumentPreviewTooltip`.
- Pass `doc.id` to the wrapper.
- Ensure the existing "preview snippet" in the card design remains as a static fallback.

#### [MODIFY] [DocumentsPage](<file:///d:/DuAnRieng/MemMart/client/app/(dashboard)/documents/page.tsx>)

- No changes needed structurally, but verify the `DocumentCard` integration works within the grid.

## Verification Plan

### Automated Tests

- None. This is a UI interaction feature.

### Manual Verification

1.  **Hover Interaction**:
    - Open the Documents page.
    - Hover over a document card.
    - Verify that after a short delay (e.g., 500ms), a tooltip appears.
    - Verify that a loading spinner appears initially.
    - Verify that the document content loads and is displayed.
2.  **Content Rendering**:
    - Check that Markdown formatting (bold, headers) is stripped or rendered reasonably within the preview.
    - Check that long content is truncated or scrollable.
3.  **Caching/Performance**:
    - Hover over the same document again. Verify it does not re-fetch (if we implement varying caching, otherwise fast re-fetch).
    - Hover over multiple documents quickly. Verify the UI doesn't glitch.
