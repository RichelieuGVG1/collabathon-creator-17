
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CreateHackathonForm from './CreateHackathonForm';
import { PlusCircle } from 'lucide-react';

const AdminPanel = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="my-6 flex justify-center">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <PlusCircle size={16} /> Создать хакатон
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <CreateHackathonForm onClose={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
