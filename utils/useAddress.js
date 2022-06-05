import { useAccount } from 'wagmi';

export default function useAddress() {
  const { data: accountData } = useAccount();
  return accountData?.address ?? null;
}