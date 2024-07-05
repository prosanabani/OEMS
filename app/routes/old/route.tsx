import { Button } from 'primereact/button'

export function Component() {
  return (
    <>
      <Outlet />
      <Button
        label="light mode "
        pt={{
          root: {
            className: ' p-5',
          },
          label: {
            className: 'bg-red',
          },
        }}
        className="bg-red"
        onClick={() => mode.set('light')}
      />
    </>
  )
}
