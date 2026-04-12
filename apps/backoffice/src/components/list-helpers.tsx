import * as React from 'react';
import type { Row, Table } from '@tanstack/react-table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Checkbox,
} from '@imphnen-frontend-service/ui/atoms';

/** Renders a header checkbox that toggles all rows (with indeterminate support). */
export function SelectAllCheckbox<T>({ table }: { table: Table<T> }) {
  return (
    <Checkbox
      checked={
        table.getIsAllRowsSelected()
          ? true
          : table.getIsSomeRowsSelected()
            ? 'indeterminate'
            : false
      }
      onCheckedChange={(v) =>
        table.toggleAllRowsSelected(!!v && v !== 'indeterminate')
      }
      aria-label="Select all"
    />
  );
}

/** Per-row checkbox. */
export function RowSelectCheckbox<T>({ row }: { row: Row<T> }) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(v) => row.toggleSelected(!!v)}
      aria-label="Select row"
    />
  );
}

type DeleteConfirmProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
};

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = 'Hapus data ini?',
  description = 'Tindakan ini tidak dapat dibatalkan. Data akan dihapus permanen.',
}: DeleteConfirmProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
