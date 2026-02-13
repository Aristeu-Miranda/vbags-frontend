import { CardContact } from "@/components/CardContact"
import { Container } from "@/components/Container"
import { Form } from "@/components/Form/Form.component";
import { IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";

export const ContactPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Container>
        <div className="flex flex-col items-center justify-center w-2/3 mx-auto mb-16">
          <h1 className="text-6xl font-lobster font-extralight mb-4 text-pink-light">Contato</h1>
          <p className="text-lg font-poppins font-light text-gray-700 leading-relaxed text-center">
          Pronto para ter uma peça de arte para vestir? Entre em contato conosco para encomendas personalizadas, 
          dúvidas ou outro assunto.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch justify-between w-full gap-10 mb-16 lg:items-center rounded-lg p-10">
          <div className="flex w-full lg:w-1/2 flex-col items-center justify-center gap-10">
            <h4 className="text-2xl font-poppins font-extralight mb-4 text-pink-light">Vamos criar algo belo juntos!</h4>
            <p className="text-lg font-poppins font-light text-gray-700 leading-relaxed text-center w-4/5">
            Seja você procurando uma peça pronta da nossa coleção ou sonhando com um design personalizado, 
            estamos aqui para dar vida à sua visão. Cada solicitação é tratada pessoalmente para garantir 
            que sua experiência seja tão única quanto nossas bolsas.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <CardContact href="https://www.instagram.com/bolsasartesanais/" title="Instagram" description="@v-bags" icon={<IoLogoInstagram className="w-10 h-10 text-gray-700" />} />
              <CardContact href="https://wa.me/55119948110987" title="WhatsApp" description="(11) 99999-9999" icon={<IoLogoWhatsapp className="w-10 h-10 text-gray-700" />} />
            </div>
          </div>
          <div className="flex w-full lg:w-1/2 flex-col items-start justify-center gap-10">
            <h2 className="text-xl font-poppins font-extralight mb-4 text-pink-light text-start">Envie-nos uma mensagem</h2>
            <Form />
          </div>
        </div>
      </Container>
    </div>
  )
}
