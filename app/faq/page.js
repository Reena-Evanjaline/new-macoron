'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FAQPage() {
    const [openSections, setOpenSections] = useState({});
    const [openQuestions, setOpenQuestions] = useState({});

    const faqData = [
        {
            title: "General",
            items: [
                {
                    question: "do you sell genuine beauty products?",
                    answer: "Yes, we only sell 100% genuine, authorized products."
                },
                {
                    question: "how do i change the language?",
                    answer: "Use the language selector in the top-right corner."
                },
                {
                    question: "how do i change the currency to my country's currency?",
                    answer: "You can select your preferred currency in the footer."
                },
                {
                    question: "can i get product recommendations?",
                    answer: "Yes! Chat with our support for personalized suggestions."
                },
                {
                    question: "i bought the same product that i previously purchased before, but the newer product has a different package or texture. why is that?",
                    answer: "Manufacturers sometimes update packaging or formulas. The product remains authentic."
                },
                {
                    question: "how can i check the manufacture date or expiration date of korean beauty items?",
                    answer: "Look for the printed manufacture/expiry date on the packaging."
                },
                {
                    question: "are all the products in the food category are halal?",
                    answer: "We source from suppliers who meet halal requirements where specified."
                }
            ]
        },
        {
            title: "Browsing Our Website",
            items: [
                {
                    question: "do i need to know the full name of an item to search?",
                    answer: "No, you can search with partial names, keywords, or product categories."
                },
                {
                    question: "does capitalization affect search results?",
                    answer: "No, our search is not case-sensitive. You can use lowercase or uppercase."
                },
                {
                    question: "which mobile devices and operating systems are compatible with stylekorean.com?",
                    answer: "StyleKorean is optimized for modern iOS and Android devices using current mobile browsers."
                },
                {
                    question: "which browsers does stylekorean support?",
                    answer: "We support Chrome, Firefox, Safari, Edge, and other modern browsers. We recommend updating your browser for the best experience."
                },
                {
                    question: "what is a wishlist?",
                    answer: "A wishlist lets you save products you're interested in for later viewing or purchase."
                },
                {
                    question: "can i request personal assistance?",
                    answer: "Yes, you can contact our customer support team anytime for personalized help."
                }
            ]
        },

        {
            title: "My Account",
            items: [
                {
                    question: "how do i make an account?",
                    answer: "Click the Sign Up button on the top right and fill out the registration form with your email and password."
                },
                {
                    question: "what are the benefits for new members?",
                    answer: "New members get exclusive discounts, early access to sales, faster checkout, and personalized recommendations."
                },
                {
                    question: "what are stylekorean points and coupons and where can i find them?",
                    answer: "Points and coupons are rewards you can use for discounts on future orders. Check your account dashboard under 'Points & Coupons'."
                },
                {
                    question: "what is the membership level, and how can i check it?",
                    answer: "Your membership level is based on your purchase history. You can see it in your account settings."
                },
                {
                    question: "how can i change my password?",
                    answer: "Go to your account settings, select 'Change Password', and follow the instructions."
                },
                {
                    question: "can i check my previous order history?",
                    answer: "Yes! Log in and navigate to 'My Orders' in your account to view all past purchases."
                },
                {
                    question: "why does the order date and time seem incorrect?",
                    answer: "Order times are based on Korean Standard Time (KST), so they may differ from your local time zone."
                },
                {
                    question: "how can i delete my account?",
                    answer: "Please contact our customer service team with your request to permanently delete your account."
                }
            ]
        },

        {
            title: "Order",
            items: [
                {
                    question: "how can i place an order?",
                    answer: "Simply add items to your cart, go to checkout, and follow the steps to complete payment and confirm your order."
                },
                {
                    question: "when i want to fill in the address, it shows this message “we are unable to ship to the following address: p.o. box, apo, fpo, dpo.”.",
                    answer: "We currently can't deliver to P.O. boxes or military addresses. Please use a physical residential or business address."
                },
                {
                    question: "how can i use the same shipping information from my previous orders?",
                    answer: "During checkout, select your saved address or choose from previous shipping addresses in your account."
                },
                {
                    question: "how can i cancel my order?",
                    answer: "Go to 'My Orders' in your account and click 'Cancel' if the order status allows it. Otherwise, contact customer service."
                },
                {
                    question: "can i cancel or change an item on my order?",
                    answer: "If your order hasn't been shipped yet, contact our customer service team as soon as possible for changes or cancellations."
                },
                {
                    question: "how can i track my recent order?",
                    answer: "You'll receive a tracking number by email after shipment. You can also find tracking details in 'My Orders' in your account."
                },
                {
                    question: "when will my order be shipped and when can i receive the tracking number?",
                    answer: "Orders are typically processed and shipped within 1–3 business days. Tracking info is emailed once the package ships."
                },
                {
                    question: "when will my order arrive?",
                    answer: "Delivery times vary by destination. Standard shipping usually takes 5–21 business days depending on your location."
                },
                {
                    question: "i accidentally clicked the ‘order received’ button. what should i do?",
                    answer: "Please contact our customer service team immediately so we can assist you with your order status."
                }
            ]
        },
        {
            title: "Payment",
            items: [
                {
                    question: "what are the available payment methods?",
                    answer: "StyleKorean currently accepts various Credit Cards, Debit Cards, Visa, MasterCard, JCB, and American Express as payment methods. During checkout, simply choose Paypal, Eximbay to process your payment. Paypal and Eximbay do not require accounts, so checkout is fast and easy."
                },
                {
                    question: "why is the paid amount and charged amount different?",
                    answer: "The charged amount can differ from the paid amount due to the exchange rate."
                },
            ]
        },
        {
            title: "Customs & Tax",
            items: [
                {
                    question: "what happens if there are banned items in my shipment?",
                    answer: "Customers should contact their local customs office for information concerning banned items in their countries. We are required by law to declare our shipments according to their actual content and value. We don’t accept requests to alter declaration values and/or content of shipments. If for any reason your local customs authorities confiscate any items from your order, StyleKorean is not responsible for reshipment or refund regarding the confiscated item(s)."
                },
                {
                    question: "what if i don’t want to pay for the tax?",
                    answer: "Unfortunately, the package can’t be cleared and delivered to you. Please note that refund or redelivery isn’t possible in this case."
                },
            ]
        },
         {
            title: "Contact Us",
            items: [
                {
                    question: "what happens if there are banned items in my shipment?",
                    answer: "Customers should contact their local customs office for information concerning banned items in their countries. We are required by law to declare our shipments according to their actual content and value. We don’t accept requests to alter declaration values and/or content of shipments. If for any reason your local customs authorities confiscate any items from your order, StyleKorean is not responsible for reshipment or refund regarding the confiscated item(s)."
                },
                {
                    question: "what if i don’t want to pay for the tax?",
                    answer: "Unfortunately, the package can’t be cleared and delivered to you. Please note that refund or redelivery isn’t possible in this case."
                },
            ]
        },
    ];

    const toggleSection = (sectionIndex) => {
        setOpenSections((prev) => ({
            ...prev,
            [sectionIndex]: !prev[sectionIndex],
        }));
    };

    const toggleQuestion = (sectionIndex, itemIndex) => {
        const key = `${sectionIndex}-${itemIndex}`;
        setOpenQuestions((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <>
        <Navbar/>
        <div className="faq-container">
            {faqData.map((section, sectionIndex) => {
                const isSectionOpen = openSections[sectionIndex];

                return (
                    <div key={sectionIndex} className="faq-section">
                        <div
                            className="faq-section-title-row"
                            onClick={() => toggleSection(sectionIndex)}
                        >
                            <span className="faq-section-title">{section.title}</span>
                            <span className="faq-section-icon">{isSectionOpen ? '−' : '+'}</span>
                        </div>

                        {isSectionOpen && (
                            <div className="faq-items">
                                {section.items.length === 0 && (
                                    <div className="faq-empty">No questions in this section.</div>
                                )}
                                {section.items.map((item, itemIndex) => {
                                    const questionKey = `${sectionIndex}-${itemIndex}`;
                                    const isQuestionOpen = openQuestions[questionKey];

                                    return (
                                        <div key={itemIndex} className="faq-item">
                                            <div
                                                className="faq-question-row"
                                                onClick={() => toggleQuestion(sectionIndex, itemIndex)}
                                            >
                                                <span className="faq-question">{item.question}</span>
                                                <span className="faq-icon">{isQuestionOpen ? '−' : '+'}</span>
                                            </div>
                                            {isQuestionOpen && (
                                                <div className="faq-answer">{item.answer}</div>
                                            )}
                                            <div className="faq-divider"></div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}

            <style jsx>{`
        .faq-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .faq-section {
          border: 1px solid #ccc;
          margin-bottom: 15px;
          border-radius: 4px;
          overflow: hidden;
        }

        .faq-section-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background-color: #f7f7f7;
          padding: 12px 16px;
          font-weight: bold;
          font-size: 16px;
          border-bottom: 1px solid #ccc;
        }

        .faq-section-icon {
          font-size: 20px;
        }

        .faq-items {
          padding: 0 16px;
          background-color: #fff;
        }

        .faq-item {
          margin-bottom: 5px;
        }

        .faq-question-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          padding: 10px 0;
        }

        .faq-question {
          text-transform: lowercase;
        }

        .faq-icon {
          font-size: 20px;
          margin-left: 10px;
        }

        .faq-divider {
          border-bottom: 1px solid #eee;
        }

        .faq-answer {
          padding: 10px 0;
          color: #555;
          line-height: 1.4;
        }

        .faq-empty {
          padding: 10px 0;
          color: #888;
          font-style: italic;
        }
      `}</style>
        </div>
        <Footer/>
        </>
    );
}
