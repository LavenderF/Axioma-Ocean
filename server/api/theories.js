import neo4j from 'neo4j-driver';

export const getTheories = async (req, res) => {
  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
  );
  
  try {
    const session = driver.session();
    const result = await session.run(`
      MATCH (t:Theory)
      OPTIONAL MATCH (t)-[r]->(other)
      RETURN t, collect(r) as relations
      LIMIT 100
    `);
    
    const theories = result.records.map(record => ({
      ...record.get('t').properties,
      relations: record.get('relations').map(r => r.type)
    }));
    
    res.json(theories);
  } finally {
    await driver.close();
  }
};
