
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApiEndpoints = () => {
  return (
    <Card className="border-muted bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">API Reference</CardTitle>
        <CardDescription>
          Documentation for the Key-Value Cache Service API endpoints
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="put" className="w-full">
          <TabsList className="w-full bg-muted/50">
            <TabsTrigger value="put" className="flex-1">PUT Operation</TabsTrigger>
            <TabsTrigger value="get" className="flex-1">GET Operation</TabsTrigger>
          </TabsList>
          <TabsContent value="put" className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium mb-1">Store a key-value pair in the cache</h3>
              <div className="bg-muted/30 p-3 rounded-md text-sm font-mono mb-2">
                <span className="text-cache-success">POST</span> /put
              </div>
              <p className="text-sm text-muted-foreground">
                Content-Type: application/json
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-cache-light mb-1">Request Body</h4>
              <pre className="bg-muted/30 p-3 rounded-md text-sm overflow-auto">
{`{
  "key": "string (max 256 characters)",
  "value": "string (max 256 characters)"
}`}
              </pre>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-cache-light mb-1">Success Response (200 OK)</h4>
              <pre className="bg-muted/30 p-3 rounded-md text-sm overflow-auto">
{`{
  "status": "OK",
  "message": "Key inserted/updated successfully."
}`}
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="get" className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium mb-1">Retrieve a value by key from the cache</h3>
              <div className="bg-muted/30 p-3 rounded-md text-sm font-mono mb-2">
                <span className="text-cache-primary">GET</span> /get?key=your_key_here
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-cache-light mb-1">Success Response (200 OK)</h4>
              <pre className="bg-muted/30 p-3 rounded-md text-sm overflow-auto">
{`{
  "status": "OK",
  "key": "example_key",
  "value": "example_value"
}`}
              </pre>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-cache-light mb-1">Error Response (404 Not Found)</h4>
              <pre className="bg-muted/30 p-3 rounded-md text-sm overflow-auto">
{`{
  "status": "ERROR",
  "message": "Key not found."
}`}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApiEndpoints;
