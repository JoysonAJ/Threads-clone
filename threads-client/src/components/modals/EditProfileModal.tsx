import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { useAppDispatch, useAppSelector } from "@/store";
  import { editProfileModal } from "@/redux/service.slice";

function EditProfileModal() {
    const dispatch = useAppDispatch()
  const {openEditProfileModal} = useAppSelector(state => state.ServiceStore)
  return (
    <div>
        <Dialog  open={openEditProfileModal} onOpenChange={onPressHideModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="submit" >Save changes</Button>
          </DialogFooter>
        </DialogContent>
        </Dialog>
    </div>
  )

  function onPressHideModal(){
    dispatch(editProfileModal(false))
  }
}

export default EditProfileModal