export interface EnquiryFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  phoneNumber: HTMLInputElement;
  company: HTMLInputElement;
}

export interface EnquiryForm extends HTMLFormElement {
  readonly elements: EnquiryFormElements;
}
