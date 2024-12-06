import { useForm } from 'react-hook-form';
import { Select, SelectItem } from '../ui/select';
import { Form, FormField, FormItem, FormLabel } from '../ui/form';
import { config } from '../../../config/config';

export default function FeatureAction({ featureState, targetState, setError }) {
  const [loading, setLoading] = useState(true);

  const [featureSelected, setFeatureSelected] = useState(false);

  const form = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => {
              <FormItem>
                <FormLabel>Feature</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {config.countriesArray.map((country) => {
                      return (
                        <SelectItem value={country}>
                          {config.countries[country]}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormItem>;
            }}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => {
              <FormItem>
                <FormLabel>Feature</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {config.countriesArray.map((country) => {
                      return (
                        <SelectItem value={country}>
                          {config.countries[country]}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormItem>;
            }}
          />
          {featureSelected && (
            <>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => {
                  <FormItem>
                    <FormLabel>Feature</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {config.countriesArray.map((country) => {
                          return (
                            <SelectItem value={country}>
                              {config.countries[country]}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>;
                }}
              />
              <div>Current values</div>
              <Button type="submit">Submit</Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
