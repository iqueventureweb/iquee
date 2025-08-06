'use server'
import { UIFieldServerComponent, UIFieldServerProps } from 'payload'
import { ContentEditor } from './ContentEditor'
/**
 * Server component for handling related make and model selection
 * @param props - Payload UI field server props including makePath and modelPath
 */
const CustomSelectComponent: UIFieldServerComponent = async (props: UIFieldServerProps) => {
  const field = props.field
  const label = typeof field?.label === 'string' ? field.label : 'Blog Content'
  return <ContentEditor path={props.path} label={label} />
}

export default CustomSelectComponent
