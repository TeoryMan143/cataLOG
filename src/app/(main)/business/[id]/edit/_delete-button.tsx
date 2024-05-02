import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

function DeleteButton({id, name}:{id:string, name:string}) {



  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          Eliminar Negocio
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Estas seguro
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default DeleteButton