import { Button, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import useBus from "use-bus";


const lngs = {
    en: { nativeName: 'English' },
    ru: { nativeName: 'Russian' },
    uk: { nativeName: 'Ukrainian' },
    tt: { nativeName: 'Tatar' },
    ba: { nativeName: 'Bashkir' },
    uz: { nativeName: 'Uzbek' },
    ja: { nativeName: 'Japanese' },
    la: { nativeName: 'Latin' },
    mn: { nativeName: 'Mongolian' },
  };

const PickLangugageModal = () => {
    const {isOpen,onOpen,onOpenChange, onClose} = useDisclosure();
    const {t, i18n} = useTranslation();

    useBus(
        "OpenLanguageModal",
        () => onOpen(),
        [isOpen]
    )

    return ( 
        <>
          <Modal 
                isOpen={isOpen}
                isDismissable={false} 
                scrollBehavior={"outside"}
                onOpenChange={onOpenChange}
            >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <p>{t("PickLanguageLabel")}</p>
                        </ModalHeader>
                        <ModalBody>
                            <Listbox onAction={(key) => i18n.changeLanguage(key) && onClose()}>
                                {Object.keys(lngs).map((lng, index) => (
                                    <ListboxItem 
                                        className={i18n.resolvedLanguage === lng ? 'text-primary' : ''} 
                                        key={lng}
                                        showDivider={index !==Object.keys(lngs).length - 1}
                                        >
                                            {lngs[lng].nativeName}
                                    </ListboxItem>
                                ))}
                            </Listbox>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
          </Modal>  
        </>
     );
}
 
export default PickLangugageModal;