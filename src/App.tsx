import axios from "axios";
import "./App.css";
import { TitlePage } from "./components/title";
import { useEffect, useState } from "react";
import { ModalRegister } from "./components/modal";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { Accordion } from "./components/accordion";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SectionContent } from "./components/Section/indes";
import { ContentForm } from "./components/form";
interface PropsData {
  id?: string;
  name: string;
  numberMain: string;
  numberCel?: string;
  numberJob?: string;
}

const userSchema = object({
  name: string().required(),
  numberMain: string().required(),
  numberCel: string(),
  numberJob: string(),
});

function App() {
  const { register, handleSubmit, setValue } = useForm<PropsData>({
    resolver: yupResolver(userSchema),
  });

  const [dataContacts, setDataContacts] = useState<PropsData[]>([]);
  const [dataContacttId, setDataContactId] = useState<PropsData>();
  const [openModalRegister, setOpenModalRegister] = useState(false);

  const [search, setSearch] = useState<string>("");

  const getContacts = () => {
    axios.get("http://localhost:3000/contacts").then((res) => {
      setDataContacts(res.data);
    });
  };

  const getContactId = (id: string | undefined) => {
    axios.get(`http://localhost:3000/contacts/${id}`).then((res) => {
      setDataContactId(res.data);

      setOpenModalRegister(true);
    });
  };

  const handleCreateContact = (body: PropsData, id: string | undefined) => {
    if (dataContacttId) {
      axios.put(`http://localhost:3000/contacts/${id}`, body).then(() => {
        getContacts();

        setOpenModalRegister(false);
      });
    } else {
      axios.post("http://localhost:3000/contacts", body).then(() => {
        getContacts();

        setOpenModalRegister(false);
      });
    }
  };

  const deleteContact = (id: string | undefined) => {
    axios.delete(`http://localhost:3000/contacts/${id}`).then(() => {
      getContacts();
    });
  };

  const ordenarPorNomeAlfabetico = (orderContacts: PropsData[]) => {
    return orderContacts.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  };

  const contactsOrdenados = ordenarPorNomeAlfabetico(dataContacts);

  const searchLowerCase = search?.toLowerCase();
  const filterContacts = contactsOrdenados?.filter((item: PropsData) =>
    item?.name.toLowerCase().includes(searchLowerCase)
  );

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    setValue("name", dataContacttId?.name as string);
    setValue("numberCel", dataContacttId?.numberCel);
    setValue("numberJob", dataContacttId?.numberJob);
    setValue("numberMain", dataContacttId?.numberMain as string);
  }, [dataContacttId, setValue]);

  return (
    <>
      <div>
        <label>Busca rapida: </label>
        <input
          placeholder="Pesquise aqui..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <TitlePage title="Meus contatos" />

      <SectionContent>
        <button onClick={() => setOpenModalRegister(true)}>Novo</button>
        {filterContacts.map((itens: PropsData) => (
          <Accordion
            title={itens.name}
            numberCel={itens.numberCel}
            numberJob={itens.numberJob}
            numberMain={itens.numberMain}
            edit={() => getContactId(itens.id)}
            deleteButton={() => deleteContact(itens.id)}
          />
        ))}

        <ModalRegister
          open={openModalRegister}
          onClose={() => setOpenModalRegister(false)}
        >
          <form
            onSubmit={handleSubmit((data) =>
              handleCreateContact(data, dataContacttId?.id)
            )}
          >
            <ContentForm>
              <h2>Novo contato</h2>
              <div>
                <label>Nome: </label>
                <input type="text" {...register("name")} />
              </div>

              <div>
                <label>Numero principal: </label>
                <InputMask mask="(99) 999999999" {...register("numberMain")} />
              </div>

              <div>
                <label>Numero celular: </label>
                <InputMask mask="(99) 999999999" {...register("numberCel")} />
              </div>

              <div>
                <label>Numero trabalho: </label>
                <InputMask mask="(99) 999999999" {...register("numberJob")} />
              </div>

              <div>
                <button type="submit">Adicionar</button>
                <button onClick={() => setOpenModalRegister(false)}>
                  Cancelar
                </button>
              </div>
            </ContentForm>
          </form>
        </ModalRegister>
      </SectionContent>
    </>
  );
}

export default App;
