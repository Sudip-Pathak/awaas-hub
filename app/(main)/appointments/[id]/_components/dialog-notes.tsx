import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
export default function DialogNotes({ dialogOpen, setDialogOpen }) {
  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader className="flex items-center gap-4">
            <div className="h-16 w-16 border rounded overflow-hidden shrink-0">
              {property?.images?.[0] ? (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <DialogTitle className="text-lg font-bold">
              {appointment.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2 mt-4">
            <label className="block font-medium">Add Note</label>
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note for this action"
            />
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitStatus}>
              {statusToUpdate === "approved" ? "Approve" : "Cancel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
