import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Star,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { mockMessages, mockTestimonials } from "public/data";
import { useState } from "react";

export default function DashboardPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    service: "",
    rating: 5,
    text: "",
    date: new Date().toISOString().split("T")[0],
  });

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const markAsRead = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: "read" } : msg))
    );
  };

  const toggleTestimonialVisibility = (id: number) => {
    setTestimonials((prev) =>
      prev.map((testimonial) =>
        testimonial.id === id
          ? { ...testimonial, visible: !testimonial.visible }
          : testimonial
      )
    );
  };

  const approveTestimonial = (id: number) => {
    setTestimonials((prev) =>
      prev.map((testimonial) =>
        testimonial.id === id
          ? { ...testimonial, approved: true, visible: true }
          : testimonial
      )
    );
  };

  const addTestimonial = () => {
    const testimonial = {
      ...newTestimonial,
      id: testimonials.length + 1,
      visible: true,
      approved: true,
    };
    setTestimonials((prev) => [...prev, testimonial]);
    setNewTestimonial({
      name: "",
      service: "",
      rating: 5,
      text: "",
      date: new Date().toISOString().split("T")[0],
    });
    setShowAddTestimonial(false);
  };

  const deleteTestimonial = (id: number) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const stats = {
    totalMessages: messages.length,
    unreadMessages: messages.filter((m) => m.status === "unread").length,
    totalTestimonials: testimonials.length,
    responseRate: "95%",
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p>Manage messages and testimonials</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium">Total Messages</p>
                  <p className="text-2xl font-bold">{stats.totalMessages}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium">Unread Messages</p>
                  <p className="text-2xl font-bold">{stats.unreadMessages}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium">Testimonials</p>
                  <p className="text-2xl font-bold">
                    {stats.totalTestimonials}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium">Response Rate</p>
                  <p className="text-2xl font-bold">{stats.responseRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Messages List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Inbox ({filteredMessages.length})
                </h3>
                {filteredMessages.map((message) => (
                  <Card
                    key={message.id}
                    className={`cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id
                        ? "ring-2 ring-secondary"
                        : ""
                    } ${message.status === "unread" ? "" : ""}`}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (message.status === "unread") {
                        markAsRead(message.id);
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{message.name}</h4>
                            <Badge
                              variant={
                                message.status === "unread"
                                  ? "default"
                                  : message.status === "replied"
                                  ? "secondary"
                                  : "outline"
                              }
                              className="text-xs rounded-full"
                            >
                              {message.status}
                            </Badge>
                          </div>
                          <p className="text-sm mb-1">{message.subject}</p>
                          <p className="text-xs">{message.serviceType}</p>
                        </div>
                        <div className="text-xs">
                          {new Date(message.date).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Message Details */}
              <div>
                {selectedMessage ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Message Details</CardTitle>
                        <Badge
                          variant={
                            selectedMessage.urgency === "24-hours"
                              ? "destructive"
                              : selectedMessage.urgency === "3-days"
                              ? "default"
                              : "secondary"
                          }
                          className="rounded-full"
                        >
                          {selectedMessage.urgency}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Client Information
                        </Label>
                        <div className="mt-1 space-y-1">
                          <p>
                            <strong>Name:</strong> {selectedMessage.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {selectedMessage.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {selectedMessage.phone}
                          </p>
                          <p>
                            <strong>Service:</strong>{" "}
                            {selectedMessage.serviceType}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Subject</Label>
                        <p className="mt-1">{selectedMessage.subject}</p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Message</Label>
                        <p className="mt-1">{selectedMessage.message}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm">Reply</Button>
                        <Button size="sm" variant="outline">
                          Mark as Important
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      Select a message to view details
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Manage Testimonials</h3>
              <Button onClick={() => setShowAddTestimonial(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </div>

            {/* Add Testimonial Form */}
            {showAddTestimonial && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Testimonial</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="testimonial-name">Client Name</Label>
                      <Input
                        id="testimonial-name"
                        value={newTestimonial.name}
                        onChange={(e) =>
                          setNewTestimonial((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="testimonial-service">Service Type</Label>
                      <Select
                        onValueChange={(value) =>
                          setNewTestimonial((prev) => ({
                            ...prev,
                            service: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Academic Writing">
                            Academic Writing
                          </SelectItem>
                          <SelectItem value="Assignment Help">
                            Assignment Help
                          </SelectItem>
                          <SelectItem value="Thesis Guidance">
                            Thesis Guidance
                          </SelectItem>
                          <SelectItem value="Project Research">
                            Project Research
                          </SelectItem>
                          <SelectItem value="Coursework Support">
                            Coursework Support
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="testimonial-rating">Rating</Label>
                    <Select
                      onValueChange={(value) =>
                        setNewTestimonial((prev) => ({
                          ...prev,
                          rating: Number.parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="testimonial-text">Testimonial Text</Label>
                    <Textarea
                      id="testimonial-text"
                      rows={4}
                      value={newTestimonial.text}
                      onChange={(e) =>
                        setNewTestimonial((prev) => ({
                          ...prev,
                          text: e.target.value,
                        }))
                      }
                      placeholder="Enter the testimonial text..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={addTestimonial}>Add Testimonial</Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddTestimonial(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Testimonials List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {testimonial.name}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className="mt-1 rounded-full"
                        >
                          {testimonial.service}
                        </Badge>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">
                      {new Date(testimonial.date).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">"{testimonial.text}"</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            testimonial.approved ? "default" : "destructive"
                          }
                          className="rounded-full"
                        >
                          {testimonial.approved ? "Approved" : "Pending"}
                        </Badge>
                        <Badge
                          variant={
                            testimonial.visible ? "default" : "secondary"
                          }
                          className="rounded-full"
                        >
                          {testimonial.visible ? "Visible" : "Hidden"}
                        </Badge>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            toggleTestimonialVisibility(testimonial.id)
                          }
                        >
                          {testimonial.visible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        {!testimonial.approved && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => approveTestimonial(testimonial.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteTestimonial(testimonial.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
