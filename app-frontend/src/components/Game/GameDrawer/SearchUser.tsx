import {AssetsFieldsFragment, Collection} from "../../../generated/queries.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {TW} from "../../../tronweb.ts";
import {useParams} from "react-router-dom";
import {Button, Flex, Group, TextInput} from "@mantine/core";
import {CollectionList} from "./CollectionList.tsx";

export const SearchUser = ({selectedCollection, setSelectedCollection, activeTab, setSelectedAsset, selectedAsset}: {
    selectedCollection: Collection | null,
    setSelectedCollection: (x: any) => void,
    setSelectedAsset: (x: any) => void,
    activeTab: string | null,
    selectedAsset: AssetsFieldsFragment | null
}) => {
    const queryClient = useQueryClient()
    const [userAddress, setAddress] = useState('')
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            address: '',
        },
        validate: {
            address: (value) => (TW.isAddress(value) ? null : 'Invalid address'),
        },
    });

    const {id} = useParams()

    useEffect(() => {
        if (id && TW.isAddress(id) && form && userAddress === '') {
            form.setValues({
                address: id
            })
            setAddress(id)
        }
    }, [id, TW, form]);


    useEffect(() => {
        queryClient.invalidateQueries([userAddress])
        setAddress('')
        form.setFieldValue('address', '')
    }, [activeTab]);

    return <Flex gap={20} direction={'column'} style={{width: '100%'}}>
        {!selectedCollection &&
            <Flex direction={'column'} style={{width: '100%'}}>
                <form style={{width: '100%'}} onSubmit={form.onSubmit((values) => {
                    setAddress(values.address)
                })}>
                    <TextInput
                        label="Address"
                        placeholder="Wallet address"
                        key={form.key('address')}
                        {...form.getInputProps('address')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Flex>
        }

        <CollectionList
            selectedCollection={selectedCollection}
            setSelectedCollection={setSelectedCollection}
            address={userAddress} selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
        />
    </Flex>
}