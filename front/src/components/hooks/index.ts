interface CalendarModalProps {
    isOpen?: boolean;
    defaultIsOpen?: boolean;
    onClose?(): void;
    onOpen?(): void;
    id?: string;
}
declare function useCalendarMeeting(props?: CalendarModalProps): {
    isOpen: boolean;
    onOpen: (args:any) => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
};
type CalendarModalPropsReturn = ReturnType<typeof useCalendarMeeting>;

export default useCalendarMeeting;
export { type CalendarModalProps,  type CalendarModalPropsReturn };
