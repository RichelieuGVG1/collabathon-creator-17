import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useHackathonStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { Plus, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const hackathonSchema = z.object({
  name: z.string().min(3, 'Название должно содержать минимум 3 символа'),
  description: z.string().min(10, 'Описание должно содержать минимум 10 символов'),
  location: z.string().min(2, 'Укажите место проведения'),
  startDate: z.date(),
  endDate: z.date(),
  organizerName: z.string().min(2, 'Укажите название организатора'),
  imageUrl: z.string().url('Введите корректный URL изображения'),
  organizerLogo: z.string().url('Введите корректный URL логотипа'),
  website: z.string().url('Введите корректный URL сайта'),
});

type HackathonFormValues = z.infer<typeof hackathonSchema>;

const CreateHackathonForm = ({ onClose }: { onClose: () => void }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [minTeamSize, setMinTeamSize] = useState(2);
  const [maxTeamSize, setMaxTeamSize] = useState(5);
  const { createHackathon } = useHackathonStore();
  const { toast } = useToast();

  const form = useForm<HackathonFormValues>({
    resolver: zodResolver(hackathonSchema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000 * 3), // Default to 3 days later
      organizerName: '',
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      organizerLogo: 'https://cdn-icons-png.flaticon.com/512/4372/4372820.png',
      website: 'https://example.com/hackathon',
    },
  });

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = (data: HackathonFormValues) => {
    createHackathon({
      name: data.name,
      description: data.description,
      startDate: format(data.startDate, 'yyyy-MM-dd'),
      endDate: format(data.endDate, 'yyyy-MM-dd'),
      location: data.location,
      tags: tags,
      imageUrl: data.imageUrl,
      organizerName: data.organizerName,
      organizerLogo: data.organizerLogo,
      website: data.website,
      teamSize: {
        min: minTeamSize,
        max: maxTeamSize
      },
      prizes: [
        {
          place: '1-е место',
          description: 'Денежный приз',
        }
      ],
      schedule: [
        {
          date: format(data.startDate, 'yyyy-MM-dd'),
          time: '10:00 - 11:00',
          title: 'Открытие',
          description: 'Церемония открытия хакатона'
        },
        {
          date: format(data.endDate, 'yyyy-MM-dd'),
          time: '16:00 - 17:00',
          title: 'Закрытие',
          description: 'Церемония награждения победителей'
        }
      ]
    });

    toast({
      title: "Успех",
      description: "Хакатон успешно создан",
    });
    
    onClose();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Создание нового хакатона</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название хакатона</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите название" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Опишите цели и задачи хакатона" 
                        className="resize-none min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Дата начала</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd.MM.yyyy")
                              ) : (
                                <span>Выберите дату</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Дата завершения</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd.MM.yyyy")
                              ) : (
                                <span>Выберите дату</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < form.getValues("startDate")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Место проведения</FormLabel>
                    <FormControl>
                      <Input placeholder="Онлайн или физическое место" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Теги</FormLabel>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Добавить тег"
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    size="sm" 
                    onClick={addTag}
                    disabled={!tagInput}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <div 
                      key={tag} 
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => removeTag(tag)} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <FormLabel>Мин. размер команды</FormLabel>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={minTeamSize}
                    onChange={(e) => setMinTeamSize(parseInt(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div className="flex-1">
                  <FormLabel>Макс. размер команды</FormLabel>
                  <Input
                    type="number"
                    min={minTeamSize}
                    max="20"
                    value={maxTeamSize}
                    onChange={(e) => setMaxTeamSize(parseInt(e.target.value))}
                    className="mt-2"
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="organizerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название организатора</FormLabel>
                    <FormControl>
                      <Input placeholder="Компания или организация" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL изображения хакатона</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organizerLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL логотипа организатора</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/logo.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Веб-сайт</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <Button type="button" variant="ghost" onClick={onClose}>Отмена</Button>
                <Button type="submit">Создать хакатон</Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CreateHackathonForm;
