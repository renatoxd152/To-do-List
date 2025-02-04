import { CadastroTarefa } from "@/src/components";
import { StatusBar } from "expo-status-bar";
export default function Index() {
  return (
    <>
      <CadastroTarefa />
      <StatusBar style="auto" />
    </>
  );
}
