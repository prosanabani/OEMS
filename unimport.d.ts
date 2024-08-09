export {}
declare global {
  const AppStore: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/stores/AppStore')['default']
  const GlobalBreadCrumb: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/components/GlobalBreadCrumb')['default']
  const Link: typeof import('react-router-dom')['Link']
  const NavLink: typeof import('react-router-dom')['NavLink']
  const Navigate: typeof import('react-router-dom')['Navigate']
  const OEMSToast: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/components/OEMSToast')['default']
  const Outlet: typeof import('react-router-dom')['Outlet']
  const Route: typeof import('react-router-dom')['Route']
  const Routes: typeof import('react-router-dom')['Routes']
  const afterAll: typeof import('vitest')['afterAll']
  const afterEach: typeof import('vitest')['afterEach']
  const analytics: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/config/firebase')['analytics']
  const apiClient: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/config/apiClient')['apiClient']
  const app: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/config/firebase')['app']
  const assert: typeof import('vitest')['assert']
  const auth: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/config/firebase')['auth']
  const authGuard: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/middlewares/authGuard')['authGuard']
  const beforeAll: typeof import('vitest')['beforeAll']
  const beforeEach: typeof import('vitest')['beforeEach']
  const chai: typeof import('vitest')['chai']
  const describe: typeof import('vitest')['describe']
  const expect: typeof import('vitest')['expect']
  const i18n: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/config/i18n')['i18n']
  const it: typeof import('vitest')['it']
  const locale: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/config/i18n')['locale']
  const mode: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/config/mode')['mode']
  const queryClient: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/config/queryClient')['default']
  const router: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/config/routes')['router']
  const setNewName: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/stores/user')['setNewName']
  const showToast: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/stores/AppStore')['showToast']
  const suite: typeof import('vitest')['suite']
  const test: typeof import('vitest')['test']
  const useCallback: typeof import('react')['useCallback']
  const useContext: typeof import('react')['useContext']
  const useEffect: typeof import('react')['useEffect']
  const useHref: typeof import('react-router-dom')['useHref']
  const useInRouterContext: typeof import('react-router-dom')['useInRouterContext']
  const useLinkClickHandler: typeof import('react-router-dom')['useLinkClickHandler']
  const useLocation: typeof import('react-router-dom')['useLocation']
  const useMemo: typeof import('react')['useMemo']
  const useNavigate: typeof import('react-router-dom')['useNavigate']
  const useNavigationType: typeof import('react-router-dom')['useNavigationType']
  const useOutlet: typeof import('react-router-dom')['useOutlet']
  const useOutletContext: typeof import('react-router-dom')['useOutletContext']
  const useParams: typeof import('react-router-dom')['useParams']
  const useReducer: typeof import('react')['useReducer']
  const useRef: typeof import('react')['useRef']
  const useResolvedPath: typeof import('react-router-dom')['useResolvedPath']
  const useRoutes: typeof import('react-router-dom')['useRoutes']
  const useSearchParams: typeof import('react-router-dom')['useSearchParams']
  const useState: typeof import('react')['useState']
  const useUserStore: typeof import('C:/Users/dell/Documents/GitHub/OEMS/app/stores/user')['useUserStore']
  const vi: typeof import('vitest')['vi']
  const vitest: typeof import('vitest')['vitest']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { Locale } from 'C:/Users/dell/Documents/GitHub/OEMS/app/config/i18n'
  import('C:/Users/dell/Documents/GitHub/OEMS/app/config/i18n')
  // @ts-ignore
  export type { Mode } from 'C:/Users/dell/Documents/GitHub/OEMS/app/config/mode'
  import('C:/Users/dell/Documents/GitHub/OEMS/app/config/mode')
  // @ts-ignore
  export type { UserStore } from 'C:/Users/dell/Documents/GitHub/OEMS/app/stores/user'
  import('C:/Users/dell/Documents/GitHub/OEMS/app/stores/user')
}