/**
 * VALERIOO - WhatsApp Helper Utilities
 * 
 * Generates formatted WhatsApp URLs for product inquiries and cart orders.
 * WhatsApp number is dynamically sourced from siteConfig.
 */

import { siteConfig } from "../data/siteConfig";

/**
 * Encodes text and creates a direct https://wa.me/ link
 */
export const createWhatsAppLink = (message, phoneNumber = siteConfig.whatsapp.number) => {
  // Strip any non-numeric characters from phone number for the URL
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};

/**
 * Formats a single product inquiry/order message
 */
export const formatProductMessage = (product, quantity = 1, selectedVariant = null) => {
  const size = selectedVariant?.size || product.volume || "Standard";
  const price = selectedVariant?.price || product.price || 0;
  const formattedPrice = `₹${price.toLocaleString("en-IN")}`;
  const mrpText = selectedVariant?.mrp && selectedVariant.mrp > price ? ` (MRP: ₹${selectedVariant.mrp.toLocaleString("en-IN")})` : "";
  const offerText = selectedVariant?.badge ? ` [${selectedVariant.badge}]` : "";

  return `Hello VALERIOO,

I am interested in ordering:

Product: ${product.name}
Size: ${size}${offerText}
Price: ${formattedPrice}${mrpText}
Quantity: ${quantity}
Category: ${product.category} Collection

Please share availability and delivery details.

Thank you.`;
};

/**
 * Triggers WhatsApp direct link for a single product inquiry
 */
export const sendProductInquiry = (product, quantity = 1, selectedVariant = null) => {
  const message = formatProductMessage(product, quantity, selectedVariant);
  const link = createWhatsAppLink(message);
  window.open(link, "_blank", "noopener,noreferrer");
};

/**
 * Formats an order message for multiple cart items
 */
export const formatCartMessage = (cartItems, totalAmount, totalCount) => {
  const itemsText = cartItems
    .map((item, index) => {
      const itemSubtotal = item.price * item.quantity;
      const formattedItemPrice = `₹${item.price.toLocaleString("en-IN")}`;
      const formattedSubtotal = `₹${itemSubtotal.toLocaleString("en-IN")}`;

      return `${index + 1}. ${item.name}
Quantity: ${item.quantity}
Price: ${formattedItemPrice} each
Subtotal: ${formattedSubtotal}`;
    })
    .join("\n\n");

  const formattedTotal = `₹${totalAmount.toLocaleString("en-IN")}`;

  return `Hello VALERIOO,

I would like to place an order for:

${itemsText}

Total Items: ${totalCount}
Estimated Total: ${formattedTotal}

Please confirm availability, shipping charges and delivery details.

Thank you.`;
};

/**
 * Triggers WhatsApp direct link for the cart
 */
export const sendCartOrder = (cartItems, totalAmount, totalCount) => {
  if (!cartItems || cartItems.length === 0) return;
  const message = formatCartMessage(cartItems, totalAmount, totalCount);
  const link = createWhatsAppLink(message);
  window.open(link, "_blank", "noopener,noreferrer");
};

/**
 * General contact inquiry message
 */
export const sendGeneralInquiry = (customText) => {
  const message = customText || siteConfig.whatsapp.defaultMessage;
  const link = createWhatsAppLink(message);
  window.open(link, "_blank", "noopener,noreferrer");
};
