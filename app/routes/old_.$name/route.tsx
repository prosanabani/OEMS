export function Component() {
  const { name } = useParams()

  console.log(name)
  return <div>{name}</div>
}
