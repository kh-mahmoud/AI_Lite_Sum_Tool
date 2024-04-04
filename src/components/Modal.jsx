import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    Button
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import state from "../store"




const Modals = ({ isOpen, setIsOpen }) => {

    const lang=JSON.parse(localStorage.getItem('lang'))

    const [selectedLanguage, setSelectedLanguage] = useState(lang);
    

   const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    useEffect(()=>
    {
       localStorage.removeItem("lang")
       localStorage.setItem("lang",JSON.stringify(selectedLanguage))
       setIsOpen(false)
    },[selectedLanguage])

    state.lang=selectedLanguage

 

    return (
        <Modal
            isOpen={isOpen}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Choose Your Summarizer Language</ModalHeader>
                <ModalCloseButton onClick={() => setIsOpen(false)} />
                <ModalBody pb={6}>
                    <Select placeholder="Select Language" value={selectedLanguage} onChange={handleLanguageChange}>
                        <option  value='ar'>Arabic</option>
                        <option value='en'>English</option>
                        <option value='fr'>French</option>
                        <option value='es'>Spanish</option>
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost'  mr={3} onClick={() => setIsOpen(false)} >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Modals;
