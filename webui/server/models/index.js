const sequelize = require('../database');
const Category = require('./Category');
const Group = require('./Group');
const Profile = require('./Profile');
const CostCenter = require('./CostCenter');
const Peer = require('./Peer');
const PeerGroup = require('./PeerGroup');
const Queue = require('./Queue');
const QueueMember = require('./QueueMember');
const Trunk = require('./Trunk');
const InboundRoute = require('./InboundRoute');
const OutboundRoute = require('./OutboundRoute');
const ProfileRoute = require('./ProfileRoute');
const ServiceHour = require('./ServiceHour');
const Holiday = require('./Holiday');
const Blacklist = require('./Blacklist');
const Conference = require('./Conference');
const MusicOnHold = require('./MusicOnHold');
const CDR = require('./CDR');
const IVR = require('./IVR');
const IVROption = require('./IVROption');
const Contact = require('./Contact');
const User = require('./User');
const CustomRule = require('./CustomRule');
const Callback = require('./Callback');
const ClickToCall = require('./ClickToCall');

// Peer relationships
Peer.belongsTo(Category, { foreignKey: 'categoryId', as: 'Category' });
Category.hasMany(Peer, { foreignKey: 'categoryId', as: 'Peers' });

Peer.belongsTo(Profile, { foreignKey: 'profileId', as: 'Profile' });
Profile.hasMany(Peer, { foreignKey: 'profileId', as: 'Peers' });

Peer.belongsTo(CostCenter, { foreignKey: 'costCenterId', as: 'CostCenter' });
CostCenter.hasMany(Peer, { foreignKey: 'costCenterId', as: 'Peers' });

// Peer-Group many-to-many
Peer.belongsToMany(Group, { through: PeerGroup, foreignKey: 'peerId', as: 'Groups' });
Group.belongsToMany(Peer, { through: PeerGroup, foreignKey: 'groupId', as: 'Peers' });

// Queue relationships
Queue.hasMany(QueueMember, { foreignKey: 'queueId', as: 'Members' });
QueueMember.belongsTo(Queue, { foreignKey: 'queueId', as: 'Queue' });
QueueMember.belongsTo(Peer, { foreignKey: 'peerId', as: 'Peer' });
Peer.hasMany(QueueMember, { foreignKey: 'peerId', as: 'QueueMemberships' });

// Profile-OutboundRoute many-to-many
Profile.belongsToMany(OutboundRoute, { through: ProfileRoute, foreignKey: 'profileId', as: 'OutRoutes' });
OutboundRoute.belongsToMany(Profile, { through: ProfileRoute, foreignKey: 'outboundRouteId', as: 'Profiles' });

// OutboundRoute-Trunk
OutboundRoute.belongsTo(Trunk, { foreignKey: 'trunkId', as: 'Trunk' });
Trunk.hasMany(OutboundRoute, { foreignKey: 'trunkId', as: 'OutboundRoutes' });

// InboundRoute-ServiceHour
InboundRoute.belongsTo(ServiceHour, { foreignKey: 'serviceHourId', as: 'ServiceHour' });
ServiceHour.hasMany(InboundRoute, { foreignKey: 'serviceHourId', as: 'InboundRoutes' });

// Holiday-ServiceHour
Holiday.belongsTo(ServiceHour, { foreignKey: 'serviceHourId', as: 'ServiceHour' });
ServiceHour.hasMany(Holiday, { foreignKey: 'serviceHourId', as: 'Holidays' });

// IVR-IVROption
IVR.hasMany(IVROption, { foreignKey: 'ivrId', as: 'Options' });
IVROption.belongsTo(IVR, { foreignKey: 'ivrId', as: 'IVR' });

// Contact-Peer
Contact.belongsTo(Peer, { foreignKey: 'peerId', as: 'Owner' });
Peer.hasMany(Contact, { foreignKey: 'peerId', as: 'Contacts' });

// User-Peer
User.belongsTo(Peer, { foreignKey: 'peerId', as: 'Peer' });
Peer.hasOne(User, { foreignKey: 'peerId', as: 'User' });

// CDR relationships
CDR.belongsTo(Trunk, { foreignKey: 'trunkId', as: 'Trunk' });
CDR.belongsTo(Queue, { foreignKey: 'queueId', as: 'Queue' });
CDR.belongsTo(CostCenter, { foreignKey: 'costCenterId', as: 'CostCenter' });

// Sync database
const syncDatabase = async (options = {}) => {
  try {
    // Use alter: true to update tables if they exist but are missing columns
    // This is safer than force: true which drops data
    await sequelize.sync({ ...options, alter: true });
    console.log('Database synchronized successfully (alter: true)');

    // Create default data if needed
    await createDefaultData();

    return true;
  } catch (error) {
    console.error('Error synchronizing database:', error);
    throw error;
  }
};

// Create default data
const createDefaultData = async () => {
  try {
    // Create default category if not exists
    const [defaultCategory] = await Category.findOrCreate({
      where: { name: 'Padrão' },
      defaults: {
        name: 'Padrão',
        description: 'Categoria padrão para ramais',
        nat: true,
        voicemail: true,
        callLimit: 1,
        timeout: 60,
        monitor: 'none',
        createdBy: 'system'
      }
    });

    // Create default profile if not exists
    const [defaultProfile] = await Profile.findOrCreate({
      where: { name: 'Interno' },
      defaults: {
        name: 'Interno',
        description: 'Perfil para chamadas internas apenas',
        createdBy: 'system'
      }
    });

    // Create default cost center if not exists
    await CostCenter.findOrCreate({
      where: { name: 'Geral' },
      defaults: {
        name: 'Geral',
        description: 'Centro de custo padrão',
        createdBy: 'system'
      }
    });

    // Create default admin user if not exists
    await User.findOrCreate({
      where: { username: 'admin' },
      defaults: {
        username: 'admin',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        name: 'Administrador',
        administrator: true,
        superAdministrator: true,
        callcenter: 'supervisor',
        permissions: JSON.stringify([
          'peers', 'trunks', 'queues', 'ivrs', 'routes',
          'serviceHours', 'reports', 'system', 'users'
        ]),
        createdBy: 'system'
      }
    });

    // Create default music on hold
    await MusicOnHold.findOrCreate({
      where: { name: 'default' },
      defaults: {
        name: 'default',
        directory: '/var/lib/asterisk/moh',
        mode: 'files',
        sort: 'random',
        createdBy: 'system'
      }
    });

    // Create default click-to-call config
    await ClickToCall.findOrCreate({
      where: { name: 'clickToCall' },
      defaults: {
        name: 'clickToCall',
        configuration: JSON.stringify({
          srcVar: 'origem',
          dstVar: 'destino',
          srcCondition: false,
          dstCondition: false,
          srcConditions: [],
          dstConditions: []
        }),
        authenticate: true,
        createdBy: 'system'
      }
    });

    console.log('Default data created successfully');
  } catch (error) {
    console.error('Error creating default data:', error);
  }
};

module.exports = {
  sequelize,
  syncDatabase,
  Category,
  Group,
  Profile,
  CostCenter,
  Peer,
  PeerGroup,
  Queue,
  QueueMember,
  Trunk,
  InboundRoute,
  OutboundRoute,
  ProfileRoute,
  ServiceHour,
  Holiday,
  Blacklist,
  Conference,
  MusicOnHold,
  CDR,
  IVR,
  IVROption,
  Contact,
  User,
  CustomRule,
  Callback,
  ClickToCall
};
