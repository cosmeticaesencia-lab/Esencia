export type PricingOption = {
  id: string;
  label: string;
  quantity: number;
  totalPrice: number;
  badge?: string;
  freeShipping?: boolean;
};

export type ShippingForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

export type CardForm = {
  cardNumber: string;
  expiry: string;
  cvv: string;
  holderName: string;
};

export type PaymentMethod = "visa" | "mastercard" | "mercadopago";

export type CheckoutProduct = {
  name: string;
  image: string;
};

export function formatPrice(amount: number) {
  return `$${amount.toLocaleString("es-AR")}`;
}

export function getShippingCost(freeShipping?: boolean) {
  return freeShipping ? 0 : 490;
}

export function generateOrderNumber() {
  return `#${Math.floor(100000 + Math.random() * 900000)}`;
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isShippingFormValid(form: ShippingForm) {
  return (
    form.fullName.trim() !== "" &&
    form.email.trim() !== "" &&
    isValidEmail(form.email) &&
    form.phone.trim() !== "" &&
    form.address.trim() !== "" &&
    form.city.trim() !== "" &&
    form.postalCode.trim() !== ""
  );
}

export function isCardFormValid(form: CardForm) {
  return (
    form.cardNumber.trim() !== "" &&
    form.expiry.trim() !== "" &&
    form.cvv.trim() !== "" &&
    form.holderName.trim() !== ""
  );
}

export function isCardPayment(method: PaymentMethod) {
  return method === "visa" || method === "mastercard";
}
