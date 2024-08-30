import Button, { ButtonColor } from "@app/components/Button";
import { BaseDialog } from "./BaseDialog";
import { closeDialog } from "..";
import InputBox from "@app/components/InputBox";
import { useState } from "react";
import { ActiveProfile } from "@app/profiles/types";
import styles from "./CreateShortcutDialog.module.css"

//const ShortcutParameters: React.FC<Props> = ({})

interface ShortcutInnerProps {
    activeProfile: ActiveProfile

}

function ShortcutInner({activeProfile}: ShortcutInnerProps) {

    const [filePath, setFilePath] = useState("C:/Users/Public/Desktop/YARG Shortcut.lnk"); // temporary

    return <>
        <div className={styles.option}>
            Target Location
            <InputBox state={filePath} setState={setFilePath}></InputBox>
        </div>
        <div>{activeProfile.profile.metadata.iconUrl}</div>
    </>;
}

export class CreateShortcutDialog extends BaseDialog<Record<string, never>> {
    constructor(props: Record<string, unknown>) {
        super(props);
    }

    getInnerContents(): JSX.Element {
        const fakeTypeCheck = (obj: unknown): obj is ActiveProfile => {
            return true; // TODO: Implement some actual type check. I'm not sure how to do this without changing the BaseDialog type.
        };
        if (this.props.activeProfile != undefined) {
            if (fakeTypeCheck(this.props.activeProfile)) {
                return <>
                    <ShortcutInner activeProfile={this.props.activeProfile}></ShortcutInner>
                </>;
            } else {
                return <>
                    <div>Error: invalid profile</div>
                </>;
            }
        } else {
            return <>
                <div>Error: no profile</div>
            </>;
        }
    }

    getTitle(): JSX.Element {
        return <>Create Shortcut</>;
    }

    getButtons() {
        return <>
            <Button color={ButtonColor.DARK} rounded onClick={() => closeDialog()}>
                Cancel
            </Button>
            <Button color={ButtonColor.GREEN} rounded onClick={() => closeDialog()}>
                Create
            </Button>
        </>;
    }
}