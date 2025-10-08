import { useState, useEffect } from 'react'
import { Users, University, Phone, Mail, Calendar, Book, MessageSquare, Download, Refresh } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { toast } from 'sonner@2.0.3'
import { makeRequest } from '../utils/api'

interface Member {
  id: string
  name: string
  email: string
  university: string
  course: string
  year: string
  phone: string
  motivation: string
  joinedAt: string
}

export function Admin() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterUniversity, setFilterUniversity] = useState('')
  const [filterYear, setFilterYear] = useState('')

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const data = await makeRequest('/admin/members', { timeout: 8000 })
      setMembers(data.members || [])
    } catch (error) {
      console.log('Error fetching members:', error.message)
      if (error.message.includes('timed out')) {
        toast.error('Request timed out. Please try again.')
      } else {
        toast.error('Network error loading members')
      }
    } finally {
      setLoading(false)
    }
  }

  const downloadCSV = () => {
    const csvHeaders = 'Name,Email,University,Course,Year,Phone,Motivation,Joined Date\n'
    const csvData = members.map(member => 
      `"${member.name}","${member.email}","${member.university}","${member.course}","${member.year}","${member.phone}","${member.motivation}","${new Date(member.joinedAt).toLocaleDateString()}"`
    ).join('\n')
    
    const blob = new Blob([csvHeaders + csvData], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tytc-members-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.university.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesUniversity = !filterUniversity || member.university.toLowerCase().includes(filterUniversity.toLowerCase())
    const matchesYear = !filterYear || member.year === filterYear
    
    return matchesSearch && matchesUniversity && matchesYear
  })

  const universities = [...new Set(members.map(m => m.university))].sort()
  const years = [...new Set(members.map(m => m.year))].sort()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-black">TYTC Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage Tyora Youth Tech Club members</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={fetchMembers} variant="outline" className="flex items-center space-x-2">
                <Refresh className="w-4 h-4" />
                <span>Refresh</span>
              </Button>
              <Button onClick={downloadCSV} className="bg-tyora-blue hover:bg-blue-700 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download CSV</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{members.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Universities</CardTitle>
              <University className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{universities.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {members.filter(m => 
                  new Date(m.joinedAt).getMonth() === new Date().getMonth() &&
                  new Date(m.joinedAt).getFullYear() === new Date().getFullYear()
                ).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {members.filter(m => 
                  new Date(m.joinedAt).toDateString() === new Date().toDateString()
                ).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter and search through members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="Search by name, email, or university..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Select value={filterUniversity} onValueChange={setFilterUniversity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by university" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Universities</SelectItem>
                    {universities.map(university => (
                      <SelectItem key={university} value={university}>{university}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filterYear} onValueChange={setFilterYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Years</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year}>
                        {year === 'graduate' ? 'Graduate' : `${year}${year === '1' ? 'st' : year === '2' ? 'nd' : year === '3' ? 'rd' : 'th'} Year`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Members List */}
        <Card>
          <CardHeader>
            <CardTitle>Members ({filteredMembers.length})</CardTitle>
            <CardDescription>
              {filteredMembers.length !== members.length ? 
                `Showing ${filteredMembers.length} of ${members.length} members` :
                `All ${members.length} members`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tyora-blue mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading members...</p>
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {members.length === 0 ? 'No members yet' : 'No members match your filters'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg text-black">{member.name}</h3>
                          <Badge variant="secondary">
                            {member.year === 'graduate' ? 'Graduate' : `Year ${member.year}`}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>{member.email}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{member.phone || 'Not provided'}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <University className="w-4 h-4" />
                            <span>{member.university}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Book className="w-4 h-4" />
                            <span>{member.course || 'Not specified'}</span>
                          </div>
                        </div>
                        
                        {member.motivation && (
                          <div className="mb-3">
                            <div className="flex items-start space-x-2 text-sm">
                              <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-gray-600 italic">"{member.motivation}"</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>Joined {new Date(member.joinedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}