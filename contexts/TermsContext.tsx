// ./contexts/TermsContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TermsContextType {
  termsAccepted: boolean;
  setTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

// Create the terms context
const TermsContext = createContext<TermsContextType | null>(null);

// Provider to manage the terms state
export const TermsProvider = ({ children }: { children: ReactNode }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the terms have been accepted
  useEffect(() => {
    const checkTermsAccepted = async () => {
      try {
        const accepted = await AsyncStorage.getItem("termsAccepted");
        setTermsAccepted(accepted === "true");
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };

    checkTermsAccepted();
  }, []);

  return (
    <TermsContext.Provider value={{ termsAccepted, setTermsAccepted, loading }}>
      {children}
    </TermsContext.Provider>
  );
};

// Hook to access the terms context
export const useTerms = () => {
  const context = useContext(TermsContext);
  if (!context) {
    throw new Error("useTerms must be used within a TermsProvider");
  }
  return context;
};
