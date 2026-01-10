import { FormComponent, useFormContext } from './base'
import { FormDateTimePicker } from './date-time'
import { FormImage } from './image'
import { FormImages } from './images'
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
  Images: FormImages,
  Input,
  InputStep,
  DateTimePicker: FormDateTimePicker,
  Radio,
  Tags,
  Textarea,
  Switch,
}
