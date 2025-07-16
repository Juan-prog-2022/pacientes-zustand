import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { DraftPatient, Patient } from "../types";
import { v4 as uuidv4 } from "uuid";

// creamos el type PatientState para definir el estado de los pacientes y el tipo de datos
type PatientState = {
  patients: Patient[];
  activeId: Patient["id"];
  // Aquí puedes agregar más propiedades y métodos según sea necesario
  // Por ejemplo, podrías agregar métodos para agregar, eliminar o actualizar pacientes
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient["id"]) => void;
  getPatientById: (id: Patient["id"]) => void;
  updatePatient: (data: DraftPatient) => void;
};

const createPatient = (patient: DraftPatient): Patient => {
  return {
    ...patient, // Extiende los datos del paciente
    id: uuidv4(), // Genera un ID único para el paciente
  };
};

// creamos el store de zustand para manejar el estado de los pacientes
export const usePatientStore = create<PatientState>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        activeId: "",
        addPatient: (data) => {
          const newPatient = createPatient(data); // Crea un nuevo paciente con los datos proporcionados
          // Actualiza el estado de los pacientes añadiendo el nuevo paciente
          set((state) => ({
            patients: [...state.patients, newPatient],
          }));
        },
        deletePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter((patient) => patient.id !== id),
          }));
        },
        getPatientById: (id) => {
          set(() => ({
            activeId: id,
          }));
        },
        updatePatient: (data) => {
          set((state) => ({
            patients: state.patients.map(patient =>
              patient.id === state.activeId
                ? { id: state.activeId, ...data }
                : patient
            ),
            activeId: " ",
          }));
        },
      }),{ name: "patient-storage" })
 ));
