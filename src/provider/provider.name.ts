enum CommonProviderName {
  CONFIG = 'common-config-provider',
  MONGO_CONNECTION = 'mongo-connection-provider',
  DASHBOARD_CONNECTION = 'dashboard-connection-provider',
  MYSQL_CONNECTION = 'mysql-connection-provider',
  REPORT_CONNECTION = 'report-connection-provider',
  AUDIO_TRANSCODER = 'audio-transcoder-provider',
  AUDIO_DECODER = 'audio-decoder-provider',
  AUTH_SERVICE = 'auth-service-provider'
}

enum MasterProviderName {
  PROJECT_REPOSITORY = 'project-repository-provider',
  PROJECT_REPOSITORY_MAPPING = 'project-repository-mapping-provider',
  PROJECT_SERVICE = 'project-service-provider',
  QA_REPOSITORY = 'qa-repository-provider',
  QA_REPOSITORY_MAPPING = 'qa-repository-mapping-provider',
  QA_SERVICE = 'qa-service-provider',
  TEAM_SERVICE = 'team-service-provider',
  TEAM_ADAPTER = 'team-adapter-provider',
  AGENT_SERVICE = 'agent-service-provider',
  AGENT_ADAPTER = 'agent-adapter-provider',
  SKILL_SERVICE = 'skill-service-provider',
  SKILL_ADAPTER = 'skill-adapter-provider',
  ROLE_REPOSITORY = 'role-repository-provider',
  ROLE_REPOSITORY_MAPPING = 'role-repository-mapping-provider',
  ROLE_SERVICE = 'role-service-provider',
}

enum RecorderProviderName {
  RECORDER_REPOSITORY = 'recorder-repository-provider',
  RECORDER_REPOSITORY_MAPPING = 'recorder-repository-mapping-provider',
  RECORDER_SERVICE = 'recorder-service-provider',
  RECORDER_ADAPTER = 'recorder-adapter-provider',
  AUDIO_DOWNLOAD_ADAPTER = 'audio-download-adapter'
}

enum ReportProviderName {
  LOGIN_SERVICE = 'login-service-provider',
  LOGIN_ADAPTER = 'login-adapter-provider',
  AGENT_PERFORMANCE_SERVICE = 'agent-performance-service-provider',
  AGENT_PERFORMANCE_ADAPTER = 'agent-performance-adapter-provider',
  CALL_PERFORMANCE_SERVICE = 'call-performance-service-provider',
  CALL_PERFORMANCE_ADAPTER = 'call-performance-adapter-provider',
  DAILY_AGENT_AUX_SERVICE = 'daily-agent-aux-service-provider',
  DAILY_AGENT_AUX_ADAPTER = 'daily-agent-aux-adapter-provider',
  DAILY_AGENT_SERVICE = 'daily-agent-service-provider',
  DAILY_AGENT_ADAPTER = 'daily-agent-adapter-provider',
  DAILY_TEAM_SERVICE = 'daily-team-service-provider',
  DAILY_TEAM_ADAPTER = 'daily-team-adapter-provider',
  ABANDON_SERVICE = 'abandon-service-provider',
  ABANDON_ADAPTER = 'abandon-adapter-provider',
  HISTORICAL_SERVICE = 'historical-service-provider',
  HISTORICAL_ADAPTER = 'historical-adapter-provider',
  SUMMARY_AGENT_SERVICE = 'summary-agent-service-provider',
  SUMMARY_AGENT_ADAPTER = 'summary-agent-adapter-provider',
}

enum DashboardProviderName {
  DASHBOARD_REPOSITORY = 'dashboard-repository-provider',
  DASHBOARD_REPOSITORY_MAPPING = 'dashboard-repository-mapping-provider',
  DASHBOARD_SERVICE = 'dashboard-service-provider'
}

enum UserProviderName {
  LDAP_ADAPTER = 'ldap-adapter-provider',
  USER_REPOSITORY = 'user-repository-provider',
  USER_REPOSITORY_MAPPING = 'user-repository-mapping-provider',
  USER_SERVICE = 'user-service-provider'
}

enum QuoteProviderName {
  QUOTE_REPOSITORY = 'quote-repository-provider',
  QUOTE_REPOSITORY_MAPPING = 'quote-repository-mapping-provider',
  QUOTE_SERVICE = 'quote-service-provider'
}

enum VoteTransactionsProviderName {
  VOTE_TRANSACTIONS_REPOSITORY = 'vote-transactions-repository-provider',
  VOTE_TRANSACTIONS_REPOSITORY_MAPPING = 'vote-transactions-repository-mapping-provider',
  VOTE_TRANSACTIONS_SERVICE = 'vote-transactions-service-provider'
}

export const providerNames = Object.assign({},
  CommonProviderName,
  MasterProviderName,
  DashboardProviderName,
  RecorderProviderName,
  ReportProviderName,
  UserProviderName,
  QuoteProviderName,
  VoteTransactionsProviderName
)
