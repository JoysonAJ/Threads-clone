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
import { addPostModal } from "@/redux/service.slice";

const AddPostModal = () => {
  

  const dispatch = useAppDispatch()
  const {openAddPostModal} = useAppSelector(state => state.ServiceStore)
  


  return (
    <div>
      <Dialog  open={openAddPostModal} onOpenChange={onClickHideModal}>
        {/* <DialogTrigger asChild>
          <Button variant="outline" onClick={handleChange}>Edit Profile</Button>
        </DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
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
  );

  function onClickHideModal(){
    dispatch(addPostModal(false))
  }
};

export default AddPostModal;
