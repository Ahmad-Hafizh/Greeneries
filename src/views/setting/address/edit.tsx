/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import PlaceholderToLabelSelect from '@/components/small-components/select/placeholderToLabel';
import PlaceholderToLabelInput from '@/components/small-components/input/placeholderToLabel';
import axios from 'axios';
import { callApi } from '@/app/config/axios';
import { Button } from '@/components/ui/button';

const newAddressSchema = z.object({
  address_name: z.string().nonempty(),
  street: z.string().nonempty(),
  unit: z.string().nonempty(),
  city: z.string().nonempty(),
  province: z.string().nonempty(),
  country: z.string().nonempty(),
  zipcode: z.string().nonempty(),
});

const EditAddressViews = ({ detail }: { detail: any }) => {
  const form = useForm<z.infer<typeof newAddressSchema>>({
    resolver: zodResolver(newAddressSchema),
    defaultValues: {
      address_name: detail.address_name || '',
      street: detail.street || '',
      unit: detail.unit || '',
      city: detail.city || '',
      province: detail.province,
      country: detail.country || '',
      zipcode: detail.zipcode || '',
    },
  });
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countryId, setCountryId] = useState('');
  const [provinceId, setProvinceId] = useState('');
  const [latLng, setLatLng] = useState([0, 0]);

  const getCountries = async () => {
    try {
      const response = await axios.get('https://api.countrystatecity.in/v1/countries', { headers: { 'X-CSCAPI-KEY': 'NTBibjF5OURLOWxXZ2wwWWlUQldObzA3T2IxaEVsWDJVazNaZ2xnaA==' } });
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStates = async () => {
    try {
      const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryId}/states`, {
        headers: { 'X-CSCAPI-KEY': 'NTBibjF5OURLOWxXZ2wwWWlUQldObzA3T2IxaEVsWDJVazNaZ2xnaA==' },
      });

      setStates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCities = async () => {
    try {
      const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryId}/states/${provinceId}/cities`, {
        headers: { 'X-CSCAPI-KEY': 'NTBibjF5OURLOWxXZ2wwWWlUQldObzA3T2IxaEVsWDJVazNaZ2xnaA==' },
      });

      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectCountry = async (event: any) => {
    form.setValue('country', event);
    const country: any = countries.find((e: any) => e.name == event);
    setCountryId(country.iso2);
  };

  const selectProvince = async (event: any) => {
    form.setValue('province', event);
    const province: any = states.find((e: any) => e.name == event);
    setProvinceId(province.iso2);
  };

  const selectCity = async (event: any) => {
    form.setValue('city', event);
    const city: any = cities.find((e: any) => e.name == event);
    setLatLng([city.latitude, city.longitude]);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (form.watch('country')) {
      getStates();
    }
  }, [countryId]);

  useEffect(() => {
    if (form.watch('province')) {
      getCities();
    }
  }, [provinceId]);

  const onSubmit = async (values: z.infer<typeof newAddressSchema>) => {
    try {
      const response = await callApi.post(
        '/address/create',
        {
          ...values,
          lat: latLng[0],
          lng: latLng[1],
        },
        { withCredentials: true }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="nav flex gap-4 items-center">
        <div className="" onClick={() => router.back()}>
          <ArrowLeft />
        </div>
        {/* <p className="text-xl font-semibold">Add Address</p> */}
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-serif ">Edit existing address</h1>
          <p className="leading-tight text-lg font-medium text-gray-600">edit or delete your existing address. can not change the delivery address that on progress</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              name="address_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PlaceholderToLabelInput label="Address name" field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PlaceholderToLabelSelect field={field} label="Country" items={countries} itemValue="name" onValueChange={selectCountry} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="province"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PlaceholderToLabelSelect field={field} label="Province / State" items={states} itemValue="name" onValueChange={selectProvince} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PlaceholderToLabelSelect field={field} label="City" items={cities} itemValue="name" onValueChange={selectCity} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="street"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PlaceholderToLabelInput label="Street" field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                name="unit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PlaceholderToLabelInput label="Unit" field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="zipcode"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PlaceholderToLabelInput label="Zipcode" field={field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button className="text-xl py-4 bg-green-800 h-fit">Create address</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditAddressViews;
