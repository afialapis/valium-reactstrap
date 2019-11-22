import { library }        from '@fortawesome/fontawesome-svg-core'
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import { faAt }           from '@fortawesome/free-solid-svg-icons'
import { faBan }          from '@fortawesome/free-solid-svg-icons'
import { faCalendar }     from '@fortawesome/free-solid-svg-icons'
import { faCheck }        from '@fortawesome/free-solid-svg-icons'
import { faClock }        from '@fortawesome/free-solid-svg-icons'
import { faEnvelope }     from '@fortawesome/free-solid-svg-icons'
import { faFile }         from '@fortawesome/free-solid-svg-icons'
import { faDollarSign }   from '@fortawesome/free-solid-svg-icons'
import { faListUl }       from '@fortawesome/free-solid-svg-icons'
import { faLock }         from '@fortawesome/free-solid-svg-icons'
import { faPaintBrush }   from '@fortawesome/free-solid-svg-icons'
import { faSave }         from '@fortawesome/free-solid-svg-icons'
import { faSearch }         from '@fortawesome/free-solid-svg-icons'

import VFormRS          from './components/VFormRS'
import VInputTextRS     from './components/inputs/VInputTextRS'
import VInputEmailRS    from './components/inputs/VInputEmailRS'
import VInputUrlRS      from './components/inputs/VInputUrlRS'
import VInputPasswordRS from './components/inputs/VInputPasswordRS'
import VInputTextAreaRS from './components/inputs/VInputTextAreaRS'
import VInputNumberRS   from './components/inputs/VInputNumberRS'
import VInputDateRS     from './components/inputs/VInputDateRS'
import VInputTimeRS     from './components/inputs/VInputTimeRS'
import VInputColorRS    from './components/inputs/VInputColorRS'
import VInputCheckboxRS from './components/inputs/VInputCheckboxRS'
import VInputSelectRS   from './components/inputs/VInputSelectRS'
import VInputSelectMultipleRS from './components/inputs/VInputSelectMultipleRS'
import VInputSelectSearchRS   from './components/inputs/VInputSelectSearchRS'
import VInputFileRS           from './components/inputs/VInputFileRS'



import './assets/scss/style.scss'
 
library.add(faAlignJustify, faBan, faCalendar, faCheck, faClock, faEnvelope, faFile, faDollarSign, faListUl, faLock, faPaintBrush, faSave, faSearch, faAt)


export {VFormRS, VInputTextRS, VInputEmailRS, VInputUrlRS, VInputPasswordRS, VInputTextAreaRS, 
        VInputNumberRS, VInputDateRS, VInputTimeRS, VInputColorRS, VInputCheckboxRS, VInputSelectRS, VInputSelectMultipleRS, VInputSelectSearchRS, VInputFileRS}


