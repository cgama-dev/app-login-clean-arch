import '../config/module-alias'
import { Person } from '@/application/controller/person'

const person = new Person()

console.log(person.getName())
