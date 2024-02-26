import React from 'react';
import InputField from './InputField';
import Dropdown from './DropDown';
import RangeSlider from './RangeSlider';
import { IoMdAdd } from "react-icons/io";

interface ModalProps {
    modalTitle: string;
    buttonLabel: string;
    secButtonLabel?: string;
}

export default function Modal({ modalTitle, buttonLabel, secButtonLabel = " " }: ModalProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={openModal} className="text-white bg-black px-3 py-2 m-4 rounded-lg flex items-center">
                <i className="mr-4">
                    <IoMdAdd size={20} />
                </i>
                <p>Add</p>
            </button>
            {isOpen && (
                <div className="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10">
                    <div className="bg-white rounded-lg p-8 min-w-20 max-h-full min-w-fit overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">{modalTitle}</h2>
                        <p className='text-xs mb-4 text-red-200 italic'>* Indicates a required field</p>
                        <div className='py-4'>
                            <InputField placeholder="Adaptive Behaviour Assessment System" label="Name" important={true}/>
                        </div>
                        <div className='pb-4'>
                            <InputField placeholder="Adult Forum" label="Item Name" important={true}/>
                        </div>
                        <div className='flex flex-row py-4'>
                            <div className='pr-4'>
                                <Dropdown placeholder="Adaptive Functioning" label="Measure" important={true}/>
                            </div>
                            <div>
                                <Dropdown placeholder="Adaptive Functioning" label="Item" important={true}/>
                            </div>
                        </div>
                        <div className='py-4'>
                            <RangeSlider label='Ages'/>
                        </div>
                        <div className='flex flex-row pb-4'>
                            <div className='pr-4'>
                                <Dropdown placeholder="C" label="Level of Use" important={false}/>
                            </div>
                            <div className='pr-4'>
                                <InputField placeholder="#  2" label="Edition" important={true} type="Number"/>
                            </div>
                            <div>
                                <InputField placeholder="ABAS-2" label="Acronym" important={true}/>
                            </div>
                        </div>
                        <div className='flex flex-row py-4'>
                            <div className='pr-4'>
                                <Dropdown placeholder="Ground Level" label="Location" important={true}/>
                            </div>
                            <div>
                                <InputField placeholder="#  11" label="Quantity" important={true} type="Number"/>
                            </div>
                        </div>
                        <div className='flex justify-end pt-10'>
                            {secButtonLabel.trim() && (
                                <button onClick={closeModal} className="hover:bg-gray-100 hover:text-gray-900 px-6 py-2 border-2 border-gray-900 rounded-lg text-sm font-semibold mr-4">{secButtonLabel}</button>
                            )}
                            <button onClick={closeModal} className="text-white hover:bg-blue-300 bg-blue-200 px-6 py-2 rounded-lg text-sm font-semibold">{buttonLabel}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
