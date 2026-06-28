
import { FormStep } from "./FormStep"
import { StepProgress } from "./Progress"
import { simulationFormSteps } from "@/data/simulation"

export const SimulationForm = () => {
    const currentStep = simulationFormSteps[5];
    return (
        <>
            <StepProgress currentStep={3} totalSteps={6} />
            <FormStep
                key={currentStep.id}  {...currentStep} />
        </>
    )
}