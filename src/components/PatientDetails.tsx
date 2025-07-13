import type { Patient } from "../types";
import { PatientsDetailsItem } from "./PatientsDetailsItem";
import { usePatientStore } from "../store/store";

type PatientDetailsProps = {
  patient: Patient;
};

export default function PatientDetails({ patient }: PatientDetailsProps) {

  const deletePatient = usePatientStore((state) => state.deletePatient);


  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <PatientsDetailsItem label="ID" data={patient.id} />
      <PatientsDetailsItem label="Nombre" data={patient.name} />
      <PatientsDetailsItem label="Propietario" data={patient.caretaker} />
      <PatientsDetailsItem label="Email" data={patient.email} />
      <PatientsDetailsItem
        label="Fecha de Alta"
        data={patient.date.toString()}
      />
      <PatientsDetailsItem label="Síntomas" data={patient.symptoms} />

      <div className="flex justify-between mt-10">
        <button
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
        >
          Editar
        </button>

        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          onClick={() => deletePatient(patient.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
