import React, { createContext, useContext, useEffect, useState } from 'react';
import Purchases, { LOG_LEVEL, type CustomerInfo, type PurchasesOffering } from 'react-native-purchases';
import { Platform } from 'react-native';

const IOS_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY ?? '';

export type SubscriptionStatus = 'loading' | 'trial' | 'active' | 'expired';

interface RevenueCatContextValue {
  status: SubscriptionStatus;
  offering: PurchasesOffering | null;
  customerInfo: CustomerInfo | null;
  purchaseMonthly: () => Promise<{ error?: string }>;
  purchaseYearly: () => Promise<{ error?: string }>;
  restorePurchases: () => Promise<{ error?: string }>;
  isProActive: boolean;
}

const RevenueCatContext = createContext<RevenueCatContextValue | undefined>(undefined);

export function RevenueCatProvider({ userId, children }: { userId: string; children: React.ReactNode }) {
  const [status, setStatus] = useState<SubscriptionStatus>('loading');
  const [offering, setOffering] = useState<PurchasesOffering | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  useEffect(() => {
    if (!userId) return;
    if (Platform.OS === 'web') { setStatus('trial'); return; }
    if (!IOS_API_KEY) { setStatus('trial'); return; }

    Purchases.setLogLevel(LOG_LEVEL.ERROR);
    Purchases.configure({ apiKey: IOS_API_KEY, appUserID: userId });

    loadCustomerInfo();
    loadOfferings();

    Purchases.addCustomerInfoUpdateListener((info) => {
      setCustomerInfo(info);
      setStatus(resolveStatus(info));
    });
  }, [userId]);

  const loadCustomerInfo = async () => {
    try {
      const info = await Purchases.getCustomerInfo();
      setCustomerInfo(info);
      setStatus(resolveStatus(info));
    } catch {
      setStatus('expired');
    }
  };

  const loadOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current) setOffering(offerings.current);
    } catch {}
  };

  const resolveStatus = (info: CustomerInfo): SubscriptionStatus => {
    const entitlement = info.entitlements.active['pro'];
    if (!entitlement) return 'expired';
    if (entitlement.periodType === 'TRIAL') return 'trial';
    return 'active';
  };

  const purchaseMonthly = async () => {
    try {
      const monthly = offering?.monthly;
      if (!monthly) return { error: 'Monthly plan not available' };
      await Purchases.purchasePackage(monthly);
      return {};
    } catch (e: any) {
      if (e.userCancelled) return {};
      return { error: e.message ?? 'Purchase failed' };
    }
  };

  const purchaseYearly = async () => {
    try {
      const annual = offering?.annual;
      if (!annual) return { error: 'Yearly plan not available' };
      await Purchases.purchasePackage(annual);
      return {};
    } catch (e: any) {
      if (e.userCancelled) return {};
      return { error: e.message ?? 'Purchase failed' };
    }
  };

  const restorePurchases = async () => {
    try {
      const info = await Purchases.restorePurchases();
      setCustomerInfo(info);
      setStatus(resolveStatus(info));
      return {};
    } catch (e: any) {
      return { error: e.message ?? 'Restore failed' };
    }
  };

  const isProActive = status === 'trial' || status === 'active';

  return (
    <RevenueCatContext.Provider value={{
      status, offering, customerInfo,
      purchaseMonthly, purchaseYearly, restorePurchases,
      isProActive,
    }}>
      {children}
    </RevenueCatContext.Provider>
  );
}

export function useRevenueCat() {
  const ctx = useContext(RevenueCatContext);
  if (!ctx) throw new Error('useRevenueCat must be used within RevenueCatProvider');
  return ctx;
}
