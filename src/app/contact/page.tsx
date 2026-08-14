import ContactClientPage from '../[lang]/contact/ClientPage';
import LanguageRedirector from '../../components/LanguageRedirector';
import { LanguageProvider } from '../../context/LanguageContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Us | RulerHero",
    description: "Contact RulerHero team for support, feedback, or business inquiries.",
    alternates: {
        canonical: "https://rulerhero.com/en/contact",
    }
};

export default function ContactRootPage() {
    return (
        <LanguageProvider initialLang="en">
            <LanguageRedirector to="/contact" />
            <ContactClientPage />
        </LanguageProvider>
    );
}
