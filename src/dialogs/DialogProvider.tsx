import * as Dialog from "@radix-ui/react-dialog";
import styles from "./DialogProvider.module.css";
import { setDialogOpen, useDialog } from ".";

function DialogComponent() {
    const dialog = useDialog();

    function prevent(e: Event) {
        e.preventDefault();
    }

    let wide = false;

    if (dialog.props !== undefined && dialog.props.wide !== undefined) {
        if (typeof dialog.props.wide === "boolean" && dialog.props.wide) {
            wide = true;
        }
    }

    return <Dialog.Root open={dialog.open} onOpenChange={isOpen => setDialogOpen(isOpen)}>
        <Dialog.Portal>
            <Dialog.Overlay className={styles.overlay} />
            <Dialog.Content className={styles.content + (wide ? (" " + styles.wide) : "")} onPointerDownOutside={prevent} onInteractOutside={prevent}>
                {dialog.content ? <dialog.content {...dialog.props} /> : "No dialog assigned!"}
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>;
}

export const DialogProvider: React.FC<React.PropsWithChildren> = ({ children }: React.PropsWithChildren) => {
    return <>
        {children}

        <DialogComponent />
    </>;
};