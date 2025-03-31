import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCreateHotelMutation } from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(1, { message: "Hotel name is required" }),
  location: z.string().min(1),
  image: z.string().url(1),
  price: z.number(),
  description: z.string().min(1),
});

const CreateHotelForm = ({ onHotelCreated }) => {
  const [createHotel, { isLoading }] = useCreateHotelMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      image: "",
      price: 0,
      description: ""
    }
  });

  const handleSubmit = async (values) => {
    const { name, location, image, price, description } = values;
    try {
      toast.loading("Creating hotel...");
      const result = await createHotel({
        name,
        location,
        image,
        price,
        description,
      }).unwrap();
      toast.success("Hotel created successfully");
      if (onHotelCreated) {
        onHotelCreated(result);
      }
    } catch (error) {
      console.error("Hotel creation error:", error);
      toast.error("Hotel creation failed: " + (error.data?.message || "Unknown error"));
    }
  };

  return (
    <Form {...form}>
      <form className="w-1/2" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Name</FormLabel>
                <FormControl>
                  <Input placeholder="Hotel Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="Image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price"
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value));
                    }}
                    value={field.value}
                  />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Hotel"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateHotelForm;