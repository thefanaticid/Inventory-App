import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface CardProps {
    data: DataType[]
}

type DataType = 
{ 
    name: string 
    stock: number
}

export function CardAlertStock({ data }: CardProps) {
  return (
    <Card className={"w-ful"}>
      <CardHeader>
        <CardTitle>Stock status</CardTitle>
        <CardDescription>You have { data.length } criticial stock.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {data.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-red-400" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.stock}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
