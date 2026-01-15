# Performance Optimization Plan

## Goal Description

Reduce the loading time when users navigate to the "New Document" page. Currently, the transition is slow, likely because the heavy Monaco Editor component is bundled with the page and blocks rendering until fully loaded.

## Proposed Changes

### Client-side Optimization

#### [MODIFY] [client/app/(dashboard)/editor/[id]/page.tsx](<file:///d:/DuAnRieng/MemMart/client/app/(dashboard)/editor/%5Bid%5D/page.tsx>)

- Use `next/dynamic` to lazily load the `MarkdownEditor` component.
- Provide a custom loading component (`ssr: false`) to display a spinner while the editor code is being downloaded.
- Pass `isAutoSaveEnabled` to `useAutoSave` hook from store.

#### [MODIFY] [client/app/(dashboard)/dashboard/page.tsx](<file:///d:/DuAnRieng/MemMart/client/app/(dashboard)/dashboard/page.tsx>)

- Add a loading state to the "New Document" button to provide immediate visual feedback upon clicking (though `Link` navigation is usually instant, the lazy loading will handle the page load part).
- Ensure prefetching is enabled (default in Next.js).

### Auto-save Control

#### [MODIFY] [client/store/useDocStore.ts](file:///d:/DuAnRieng/MemMart/client/store/useDocStore.ts)

- Add `isAutoSaveEnabled` state (default `true`) and `toggleAutoSave` action.

#### [MODIFY] [client/components/editor/Toolbar.tsx](file:///d:/DuAnRieng/MemMart/client/components/editor/Toolbar.tsx)

- Add a toggle button/icon for Auto-save status.
- Show current status (on/off).

#### [MODIFY] [client/app/(dashboard)/editor/[id]/page.tsx](<file:///d:/DuAnRieng/MemMart/client/app/(dashboard)/editor/%5Bid%5D/page.tsx>)

- Connect functionality to enable/disable the `useAutoSave` hook based on the store value.

## Verification Plan

### Manual Verification

1.  **"New Document" Load Time**:
    - Open the specific "New Document" dashboard page.
    - Click "New Document".
    - Verify that the page transition happens almost immediately and a loading spinner appears in the editor area before the editor loads.
    - Use Chrome DevTools "Network" tab with "Fast 3G" throttling to simulate a slower connection and clearly see the loading state.
2.  **Auto-save Toggle**:
    - Verify the "Auto-save" toggle exists in the toolbar.
    - Verify that when disabled, changes are NOT saved automatically after the delay.
    - Verify that when enabled, changes ARE saved automatically.

### Automated Tests

- None required for this performance refactor, as it relies on visual perception and network loading behavior.
