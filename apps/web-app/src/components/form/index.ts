import { FormComponent, useFormContext } from './base'
import { FormImage } from './image'
import { Input } from './input'
import { InputStep } from './input-step'
import { Radio } from './radio'
import { Select } from './select'
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
  Select,
  Tags,
  Textarea,
  Switch,
}
