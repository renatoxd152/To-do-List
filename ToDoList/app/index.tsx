import { CadastroTarefa } from "@/src/screens/cadastro";
import { StatusBar } from "expo-status-bar";
export default function Index() {
  return (
    <>
      <CadastroTarefa />
      <StatusBar style="auto" />
    </>
  );
}
