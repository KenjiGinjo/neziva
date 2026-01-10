import { FormComponent, useFormContext } from './base'
import { FormImage } from './image'
import { Input } from './input'
import { InputStep } from './input-step'
import { Radio } from './radio'
import { Submit } from './submit'
import { Switch } from './switch'
import { Tags } from './tags'
import { Textarea } from './textarea'

export const Form = {
  useContext: useFormContext,

  Form: FormComponent,
  Submit,

  Image: FormImage,
  Input,
  InputStep,
  Radio,
  Tags,
  Textarea,
  Switch,
}
